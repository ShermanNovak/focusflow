import dayjs from "dayjs";
import { useState } from "react";
import { Image, DatePicker, Typography } from "antd";
import { useImagesQuery } from "../api/image.query";

const { Text } = Typography;

export default function PhotosOfTheMonth() {
  const { data: imagesData } = useImagesQuery();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const handleImageFilter = (date: any, dateString: string) => {
    setSelectedMonth(new Date(dateString).getMonth() + 1);
    setSelectedYear(new Date(dateString).getFullYear());
  };

  const filteredImages = imagesData?.filter((img: any) => {
    var [year, month] = img.createdAt.split("-");
    return parseInt(month) === selectedMonth && parseInt(year) === selectedYear;
  });

  return (
    <div className="p-8">
      <span className="text-xl text-black font-bold pr-5">
        Photos Of The Month
      </span>
      <DatePicker
        defaultValue={dayjs(`${selectedYear}-${selectedMonth}-01`)}
        picker="month"
        onChange={handleImageFilter}
      />
      {filteredImages && (
        <div className="mt-5 flex flex-row flex-wrap">
          {filteredImages.map((imageData: any) => (
            <div className="flex flex-col items-center" key={imageData._id}>
              <Image
                width={150}
                height={150}
                className="object-cover"
                src={imageData.url}
              />
              <Text className="font-medium pt-2 pb-4">
                {new Date(imageData.createdAt).getDate()}{" "}
                {new Date(imageData.createdAt).toLocaleString("default", {
                  month: "long",
                })}
              </Text>
            </div>
          ))}
        </div>
      )}
      {(!filteredImages || filteredImages.length === 0) && (
        <p>Oops, you haven't uploaded any photos yet!</p>
      )}
    </div>
  );
}
