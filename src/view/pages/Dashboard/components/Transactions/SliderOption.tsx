import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

type SliderOptionProps = {
	index: number;
	isActive: boolean;
	month: string;
};

export const SliderOption = ({ isActive, month, index }: SliderOptionProps) => {
	const swiper = useSwiper();

	return (
		<button
			onClick={() => swiper.slideTo(index)}
			className={cn(
				"w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium",
				isActive && "bg-white",
			)}
		>
			{month}
		</button>
	);
};
