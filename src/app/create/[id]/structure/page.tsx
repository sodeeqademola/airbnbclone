import SelectedCategory from "@/components/SelectedCategory";

const page = () => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tighter transition-colors">
          Which of these best described your home?
        </h2>
      </div>
      <SelectedCategory />
    </>
  );
};

export default page;
