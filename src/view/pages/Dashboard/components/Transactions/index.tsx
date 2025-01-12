import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { MONTHS } from "../../../../../app/utils/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";

export const Transactions = () => {
	const {
		areValuesVisible,
		isInitialLoading,
		transactions,
		isLoading,
		isFiltersModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
	} = useTransactionsController();

	const hasTransactions = transactions.length > 0;

	return (
		<div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
			{isInitialLoading && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner className="w-10 h-10" />
				</div>
			)}

			{!isInitialLoading && (
				<>
					<FiltersModal
						open={isFiltersModalOpen}
						onClose={handleCloseFiltersModal}
					/>

					<header>
						<div className="flex items-center justify-between">
							<TransactionTypeDropdown />

							<button onClick={handleOpenFiltersModal}>
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
						{isLoading && (
							<div className="flex items-center flex-col h-full justify-center">
								<Spinner />
							</div>
						)}

						{!hasTransactions && !isLoading && (
							<div className="flex items-center flex-col h-full justify-center">
								<img
									src={emptyStateImage}
									alt="Não encontramos nenhuma transação"
								/>
								<p className="text-gray-700">
									Não encontramos nenhuma transação
								</p>
							</div>
						)}

						{hasTransactions && !isLoading && (
							<>
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

									<span
										className={cn(
											"text-red-800 tracking-[-0.5px] font-medium",
											!areValuesVisible && "blur-sm"
										)}
									>
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
									<span
										className={cn(
											"text-green-800 tracking-[-0.5px] font-medium",
											!areValuesVisible && "blur-sm"
										)}
									>
										{formatCurrency(1320.2)}
									</span>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};
