import { getAllSolutions } from '@repo/domain/services/jurisdiction-service';
import { HeroSection } from '@repo/ui';
import { CompareSolutionsTable } from '@repo/domain';

export const metadata = {
  title: 'Compare Global Solutions - Elite Immigration',
  description: 'Compare residency, citizenship, and corporate structuring solutions worldwide.',
};

export default async function CompareSolutionsPage() {
  const solutions = await getAllSolutions();

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title="Compare Solutions"
        subtitle="Evaluate and compare top-tier residency, citizenship, and wealth structuring programs globally."
        backgroundImage="/images/blog-1.jpg" // We'll use a placeholder or let HeroSection fallback gradient
      />
      
      <div className="-mt-20 relative z-10">
        <CompareSolutionsTable solutions={solutions} />
      </div>
    </div>
  );
}
