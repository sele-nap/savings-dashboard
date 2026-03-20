import { render, screen } from '@testing-library/react';
import StepIndicator from '../StepIndicator';

// On teste que le composant affiche correctement les étapes selon la prop currentStep :
// - tous les labels sont présents
// - les étapes passées affichent
// - l'étape active affiche son numéro
describe('StepIndicator', () => {

  it('renders all four step labels', () => {
    render(<StepIndicator currentStep={0} />);
    expect(screen.getByText('Montant')).toBeInTheDocument();
    expect(screen.getByText('Fonds')).toBeInTheDocument();
    expect(screen.getByText('Allocation')).toBeInTheDocument();
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });

  it('marks completed steps with a checkmark', () => {
    render(<StepIndicator currentStep={2} />);
    expect(screen.getAllByText('✓')).toHaveLength(2);
  });

  it('shows the correct step number as active', () => {
    render(<StepIndicator currentStep={1} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
