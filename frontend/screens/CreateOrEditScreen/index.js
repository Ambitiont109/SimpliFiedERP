import Form from "@/components/common/Form";
import { Input } from "@/components/common/Input";
import useNotification from "@/hooks/useNotification";
import { addItem, fetchItems, updateItem } from "@/store/features/item/itemSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  location: yup.string().required(),
  quantity: yup.number().positive().integer().required(),
});

const CreateOrEditScreen = () => {
  const router = useRouter();
  const { id } = router.query; // extract the item's ID from the URL query
  const dispatch = useDispatch();
  const notification = useNotification();
  const items = useSelector((state) => state.item.items);
  const item = items.find((item) => item.id === Number(id));
  const defaultFormValues = {
    name: item && item.name,
    location: item && item.location,
    quantity: item && item.quantity,
  };

  useEffect(() => {
    if (!item) {
      dispatch(fetchItems()); // Fetch items if they haven't been loaded yet
    }
  }, []);

  const handleUpdate = (updatedData) => {
    console.log(updatedData);
    if (id)
      dispatch(updateItem({ id, updatedData })).then(() => {
        notification("Item has been updated successfully", "success");
        router.back();
      });
    else
      dispatch(addItem(updatedData)).then(() => {
        notification("Item has been created successfully", "success");
        router.back();
      });
  };

  return (
    <div className="p-10 md:p-[70px] lg:p-14 xl:p-[70px]">
      <h2 className="mb-5 text-[28px] font-bold text-black">
        {id ? "Edit Item" : "Create Item"}
      </h2>
      <Form
        onSubmit={handleUpdate}
        schema={schema}
        defaultFormValues={defaultFormValues}
      >
        <div className="tw--mx-3 tw-flex tw-flex-wrap">
          <div className="tw-w-full tw-px-3 md:tw-w-1/2">
            <Input
              label="Item Name"
              name="name"
              type="text"
              icon={
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V17.4993C17.5 17.9596 17.1269 18.3327 16.6667 18.3327C16.2064 18.3327 15.8333 17.9596 15.8333 17.4993V15.8327C15.8333 15.1696 15.5699 14.5338 15.1011 14.0649C14.6323 13.5961 13.9964 13.3327 13.3333 13.3327H6.66667C6.00363 13.3327 5.36774 13.5961 4.8989 14.0649C4.43006 14.5338 4.16667 15.1696 4.16667 15.8327V17.4993C4.16667 17.9596 3.79357 18.3327 3.33333 18.3327C2.8731 18.3327 2.5 17.9596 2.5 17.4993V15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864Z"
                      fill="#637381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.9987 3.33268C8.61799 3.33268 7.4987 4.45197 7.4987 5.83268C7.4987 7.21339 8.61799 8.33268 9.9987 8.33268C11.3794 8.33268 12.4987 7.21339 12.4987 5.83268C12.4987 4.45197 11.3794 3.33268 9.9987 3.33268ZM5.83203 5.83268C5.83203 3.5315 7.69751 1.66602 9.9987 1.66602C12.2999 1.66602 14.1654 3.5315 14.1654 5.83268C14.1654 8.13387 12.2999 9.99935 9.9987 9.99935C7.69751 9.99935 5.83203 8.13387 5.83203 5.83268Z"
                      fill="#637381"
                    />
                  </g>
                </svg>
              }
            />
          </div>
          <div className="tw-w-full tw-px-3 md:tw-w-1/2">
            <Input label="Location" name="location" type="text" />
          </div>
          <div className="tw-w-full tw-px-3 md:tw-w-1/2">
            <Input label="Quantity" name="quantity" type="number" />
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="rounded bg-primary py-3 px-9 text-base font-medium text-white transition hover:bg-opacity-90 sm:mr-4"
            onClick={()=>{router.back()}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-primary py-3 px-9 text-base font-medium text-white transition hover:bg-opacity-90"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrEditScreen;
