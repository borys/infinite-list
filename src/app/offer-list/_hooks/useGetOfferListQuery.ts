import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatus } from "../_store/reducers";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { fetchOffers } from "../_store/actions";

type UseGetOfferList = {
  offset: number;
  limit: number;
}

export function useGetOfferListQuery(range: UseGetOfferList) {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) =>
    selectStatus(state),
  );
  const data = useSelector((state: RootState) =>
    selectData(state),
  );

  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchOffers(range));
    }
  }, [dispatch, range, status]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return {data, isUninitialized, isLoading, isError, isSuccess}
}