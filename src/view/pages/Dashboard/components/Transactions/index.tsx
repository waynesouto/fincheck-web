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
import { formatDate } from "../../../../../app/utils/date";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export const Transactions = () => {
	const {
		areValuesVisible,
		isInitialLoading,
		transactions,
		isLoading,
		isFiltersModalOpen,
		filters,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeFilter,
		handleApplyFilters,
		handleCloseEditModal,
		handleOpenEditModal,
		transactionBeingEdited,
		isEditModalOpen,
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
						onApplyFilters={handleApplyFilters}
					/>

					<header>
						<div className="flex items-center justify-between">
							<TransactionTypeDropdown
								onSelect={handleChangeFilter("type")}
								selectedType={filters.type}
							/>

							<button onClick={handleOpenFiltersModal}>
								<FilterIcon />
							</button>
						</div>

						<div className="mt-6 relative">
							<Swiper
								slidesPerView={3}
								centeredSlides
								initialSlide={filters.month}
								onSlideChange={(swiper) => {
									if (swiper.activeIndex === filters.month) {
										return;
									}
									handleChangeFilter("month")(swiper.realIndex);
								}}
							>
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
								{transactionBeingEdited && (
									<EditTransactionModal
										open={isEditModalOpen}
										onClose={handleCloseEditModal}
										transaction={transactionBeingEdited}
									/>
								)}

								{transactions.map((transaction) => (
									<div
										key={transaction.id}
										className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
										role="button"
										onClick={() => handleOpenEditModal(transaction)}
									>
										<div className="flex-1 flex items-center gap-3">
											<CategoryIcon
												type={transaction.type}
												category={transaction.category?.icon}
											/>

											<div>
												<strong className="font-bold tracking-[-0.5px] block">
													{transaction.description}
												</strong>
												<span className="text-xm text-gray-600">
													{formatDate(new Date(transaction.date))}
												</span>
											</div>
										</div>

										<span
											className={cn(
												"tracking-[-0.5px] font-medium",
												transaction.type === "expense"
													? "text-red-800"
													: "text-green-800",
												!areValuesVisible && "blur-sm"
											)}
										>
											{transaction.type === "expense" ? "-" : "+"}{" "}
											{formatCurrency(transaction.value)}
										</span>
									</div>
								))}
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};
