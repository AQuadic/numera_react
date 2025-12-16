const Plates = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
};

export default Plates;
