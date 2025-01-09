import { EyeIcon } from "../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./AccountCard";

import "swiper/css";
import { AccountSliderNavigation } from "./AccountSliderNavigation";

export const Accounts = () => {
	return (
		<div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
			<div>
				<span className="tracking-[-0.5px] text-white">Saldo total</span>

				<div className="flex items-center gap-2">
					<strong className="text-2xl tracking-[-1px] text-white">
						R$ 1000,00
					</strong>

					<button className="w-8 h-8 flex items-center justify-center">
						<EyeIcon open />
					</button>
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-end">
				<div>
					<Swiper spaceBetween={16} slidesPerView={2.1}>
						<div
							slot="container-start"
							className="flex items-center justify-between mb-4"
						>
							<strong className="text-white tracking-[-1px] text-lg">
								Minhas contas
							</strong>

							<AccountSliderNavigation />
						</div>

						<SwiperSlide>
							<AccountCard
								type={"checking"}
								color="#F12312"
								name="test"
								balance={100.12}
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								type={"savings"}
								color="#F0F0"
								name="test2"
								balance={12.12}
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								type={"savings"}
								color="#fe3"
								name="test3"
								balance={40.2}
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};
