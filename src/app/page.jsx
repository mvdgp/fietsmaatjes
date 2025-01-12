import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the '/home' route immediately upon rendering
  redirect('/home');
  
  // Return null as this component does not render any UI
  return null;
}