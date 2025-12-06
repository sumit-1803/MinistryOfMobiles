'use server';

import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
import { sendOTP } from '@/lib/email';
import { login } from '@/lib/auth';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

export async function sendLoginOTP(prevState, formData) {
  const email = formData.get('email');
  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  await dbConnect();

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Find or create customer and update OTP
  let customer = await Customer.findOne({ email });
  if (!customer) {
    customer = await Customer.create({ email, otp, otpExpires });
  } else {
    customer.otp = otp;
    customer.otpExpires = otpExpires;
    await customer.save();
  }

  // Send Email
  const emailResult = await sendOTP(email, otp);
  
  if (!emailResult.success) {
    return { success: false, message: 'Failed to send OTP. Please try again.' };
  }

  return { success: true, message: 'OTP sent to your email.', email };
}

export async function verifyLoginOTP(prevState, formData) {
  const email = formData.get('email');
  const otp = formData.get('otp');

  if (!email || !otp) {
    return { success: false, message: 'Email and OTP are required.' };
  }

  await dbConnect();

  const customer = await Customer.findOne({ email });

  if (!customer) {
    return { success: false, message: 'User not found.' };
  }

  if (customer.otp !== otp) {
    return { success: false, message: 'Invalid OTP.' };
  }

  if (customer.otpExpires < new Date()) {
    return { success: false, message: 'OTP has expired. Please request a new one.' };
  }

  // Clear OTP
  customer.otp = undefined;
  customer.otpExpires = undefined;
  await customer.save();

  // Login
  await login({ 
    id: customer._id.toString(), 
    email: customer.email, 
    role: 'customer' 
  });

  redirect('/catalog');
}
