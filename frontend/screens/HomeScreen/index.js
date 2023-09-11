import MultiRangeSlider from "@/components/common/MultiRangeSlider";
import useNotification from "@/hooks/useNotification";
import { deleteItem, fecthItemsWithLink, fetchItems, itemActions } from "@/store/features/item/itemSlice";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./components/ItemList";

function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.item.items);
  const orderByField = useSelector((state) => state.item.orderByField);
  const orderAscending = useSelector((state) => state.item.orderAscending);
  const searchTerm = useSelector((state) => state.item.searchTerm);  
  const nextLink = useSelector((state) => state.item.nextLink);
  const prevLink = useSelector((state) => state.item.prevLink);

  const notification = useNotification();

  useEffect(() => {
    dispatch(fetchItems());
  }, [orderByField, orderAscending, searchTerm, dispatch]);

  useEffect(() => {
    // Fetch all items when the component mounts
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    router.push('/create/')
  },[router]);

  const handleEdit = useCallback((itemId) => {
    router.push(`/edit/${itemId}`)
  },[router]);

  const handleDelete = useCallback((itemId) => {
    dispatch(deleteItem(itemId)).then(()=>{
      notification("Item has been deleted successfully", "success");
    })
  },[dispatch]);

  const handleSearch = useCallback((searchTerm) => {
    console.log(searchTerm)
    dispatch(itemActions.setSearchTerm(searchTerm));
  },[dispatch]);

  const handleSort = useCallback((fieldName, asc) => {
    dispatch(itemActions.setSortField({ field: fieldName, asc }));
  },[dispatch]);

  const handlePrevPagination = useCallback(()=>{
    dispatch(fecthItemsWithLink(prevLink));
  }, [dispatch, prevLink])

  const handleNextPagination = useCallback(()=>{
    dispatch(fecthItemsWithLink(nextLink));
  }, [dispatch, nextLink])

  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className="flex items-center border-b border-stroke m-2 ">
          <label className="pr-4"> Filter By Quantity</label>
          <MultiRangeSlider
            min={0}
            max={100}
            onChange={({ min, max }) =>
              dispatch(itemActions.setQuantityRange({ min, max }))
            }
          />
        </div>
        <button
          className="mb-4 sm:mb-2 inline-flex items-center justify-center whitespace-nowrap rounded bg-primary py-[10px] px-5 text-sm font-medium text-white hover:bg-opacity-90"
          onClick={() => {
            dispatch(fetchItems());
          }}
        >
          Filter
        </button>
      </div>
      <ItemList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onAdd={handleAdd}
        onSort={handleSort}
        nextLink={nextLink}
        prevLink={prevLink}
        onPrev={handlePrevPagination}
        onNext={handleNextPagination}
      />
    </>
  );
}

export default HomeScreen;
