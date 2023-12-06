"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CagetoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DISCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryDirty, setCategoryDirty] = useState(false);
  const [locationDirty, setLocationDirty] = useState(false);
  const [imageSrcDirty, setImageSrcDirty] = useState(false);
  const [priceDirty, setPriceDirty] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 0,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  //react setValue hook does set the value but it does not rerender the page
  //so we need to set a custome value
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    if (
      (step === STEPS.LOCATION && locationDirty) ||
      step === STEPS.INFO ||
      (step === STEPS.IMAGES && imageSrcDirty) ||
      step === STEPS.DISCRIPTION ||
      (step === STEPS.PRICE && priceDirty)
    ) {
      setStep((value) => value - 1);
    }
    return;
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh;

        //after submit reset the useForm reset by react-form-hook
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (dirtyFields.category) {
      setCategoryDirty(true);
    }
    if (dirtyFields.location) {
      setLocationDirty(true);
    }
    if (dirtyFields.imageSrc) {
      setImageSrcDirty(true);
    }
    if (dirtyFields.price) {
      setPriceDirty(true);
    }
  }, [
    dirtyFields.category,
    dirtyFields.location,
    dirtyFields.imageSrc,
    dirtyFields.price,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  //body content
  //body content
  let bodyConetent = <div></div>;
  if (step === STEPS.CATEGORY && register("category", { required: true })) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CagetoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
        {errors.category && (
          <span className="text-red-700">Please select a category</span>
        )}
      </div>
    );
  }

  if (step === STEPS.LOCATION && register("location", { required: true })) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        {/* importing Map component by dynamic way to make sure that
        the Map component in Server side work the react-leaflet & leaflet */}
        <Map center={location?.latlng} />
        {errors.location && (
          <span className="text-red-700">Please select your country</span>
        )}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES && register("imageSrc", { required: true })) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place?"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
        {errors.imageSrc && (
          <span className="text-red-700">
            Please upload your property photos
          </span>
        )}
      </div>
    );
  }

  if (step === STEPS.DISCRIPTION) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="short and sweet works best!"
        />
        <Input
          required
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <hr />
        <Input
          required
          type="textarea"
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          className="mb-5"
        />
      </div>
    );
  }

  if (step === STEPS.PRICE && register("price", { required: true })) {
    bodyConetent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          required
          register={register}
          errors={errors}
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
        />
        {errors.price && (
          <span className="text-red-700">Please set price per night</span>
        )}
      </div>
    );
  }

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnb your home!"
        body={bodyConetent}
      />
    </div>
  );
};

export default RentModal;
