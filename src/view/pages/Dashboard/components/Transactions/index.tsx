import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { MONTHS } from "../../../../../app/utils/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export const Transactions = () => {
	return (
		<div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
			<header>
				<div className="flex items-center justify-between">
					<button className="flex items-center gap-2">
						<TransactionsIcon />
						<span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
							Transações
						</span>
						<ChevronDownIcon className="text-gray-900" />
					</button>

					<button>
						<FilterIcon />
					</button>
				</div>

				<div className="mt-6 relative">
					<Swiper slidesPerView={3} centeredSlides>
						<SliderNavigation isBeginning={false} isEnd={false} />
						{MONTHS.map((month, index) => (
							<SwiperSlide key={month}>
								{({ isActive }) => (
									<SliderOption
										isActive={isActive}
										month={month}
										index={index}
									/>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</header>

			<div className="mt-4 space-y-2 flex-1 overflow-y-auto">
				<div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
					<div className="flex-1 flex items-center gap-3">
						<CategoryIcon type="expense" />

						<div>
							<strong className="font-bold tracking-[-0.5px] block">
								Almoço
							</strong>
							<span className="text-xm text-gray-600">06/10/2025</span>
						</div>
					</div>

					<span className="text-red-800 tracking-[-0.5px] font-medium">
						- {formatCurrency(1320.2)}
					</span>
				</div>

				<div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
					<div className="flex-1 flex items-center gap-3">
						<CategoryIcon type="income" />

						<div>
							<strong className="font-bold tracking-[-0.5px] block">
								Almoço
							</strong>
							<span className="text-xm text-gray-600">06/10/2025</span>
						</div>
					</div>

					<span className="text-green-800 tracking-[-0.5px] font-medium">
						- {formatCurrency(1320.2)}
					</span>
				</div>
			</div>
		</div>
	);
};
