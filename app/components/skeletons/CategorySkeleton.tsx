const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className=" w-full h-full space-y-1 flex flex-col items-center justify-center">
        <div className=" bg-gray-300 w-[50px] h-[50px] rounded-full"></div>
        <div className="bg-gray-300 w-[100%]  h-3 rounded-xl"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
