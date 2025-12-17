import { HeroSection } from '@repo/ui';

export default function Home() {
  return (
    <div>
      <HeroSection 
        title="Your Global Future Starts Here"
        subtitle="Expert immigration guidance for students and professionals."
        mode="main"
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started
        </button>
      </HeroSection>
      
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
                <p className="text-gray-600">Navigating complex visa requirements with ease.</p>
            </div>
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Global Network</h3>
                <p className="text-gray-600">Connections to top institutions worldwide.</p>
            </div>
            <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Proven Success</h3>
                <p className="text-gray-600">Thousands of successful applications processed.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
