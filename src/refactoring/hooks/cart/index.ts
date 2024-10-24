import { useCartActions } from "./useCartActions";
import { useCartCalculations } from "./useCartCalculations";
import { useCartState } from "./useCartState";

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
