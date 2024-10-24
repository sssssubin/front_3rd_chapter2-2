import { useCartActions } from "./hooks/useCartActions";
import { useCartCalculations } from "./hooks/useCartCalculations";
import { useCartState } from "./hooks/useCartState";

export const useCart = () => {
  const { state, setState } = useCartState();
  const actions = useCartActions(state, setState);
  const calculations = useCartCalculations(state);

  return {
    items: state.items,
    coupon: state.coupon,
    ...actions,
    ...calculations,
  };
};
