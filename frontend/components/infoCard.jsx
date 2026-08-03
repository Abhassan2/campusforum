const InfoCard = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col items-center md:max-w-66 border-2 border-gray-300 rounded-xl p-5">
      {icon}
      <div className="text-center">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-gray-700">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
