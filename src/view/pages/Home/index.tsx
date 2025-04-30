import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { Button } from "@/view/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/view/components/ui/card";
import { HomeContext, HomeProvider } from "./components/HomeContext";
import { NewTransactionModal } from "./modals/NewTransactionModal";

export const Home = () => {
	return (
		<HomeProvider>
			<HomeContext.Consumer>
				{({ openNewTransactionModal }) => (
					<div className="flex-col md:flex">
						<main className="flex justify-center">
							<div className="max-w-[1024px] flex-1 space-y-4 px-4">
								<div className="flex items-center justify-end space-y-2">
									<div className="flex items-center space-x-2">
										<Button
											variant="destructive"
											className="rounded-xl text-sm"
											onClick={() => openNewTransactionModal("expense")}
										>
											<MoveUpRight />
											Despesa
										</Button>
										<Button className="rounded-xl text-sm">
											<MoveDownLeft />
											Receita
										</Button>
									</div>
								</div>

								<div className="space-y-4">
									<div className="grid gap-4 grid-cols-3 max-lg:grid-cols-2">
										<Card className="p-6 flex flex-col justify-between max-md:p-4">
											<CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
												<CardTitle className="text-sm font-medium">Despesas</CardTitle>
												<MoveUpRight className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent className="p-0">
												<div className="text-2xl font-bold">$45,231.89</div>
												<p className="text-xs text-muted-foreground">+20.1% from last month</p>
											</CardContent>
										</Card>

										<Card className="p-6 flex flex-col justify-between max-md:p-4">
											<CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
												<CardTitle className="text-sm font-medium">Receitas</CardTitle>
												<MoveUpRight className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent className="p-0">
												<div className="text-2xl font-bold">$45,231.89</div>
												<p className="text-xs text-muted-foreground text-nowrap max-w-[100%] overflow-hidden text-ellipsis">
													+20.1% from last month
												</p>
											</CardContent>
										</Card>

										<Card className="p-6 flex flex-col justify-between max-md:p-4 max-lg:col-span-2">
											<CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
												<CardTitle className="text-sm font-medium">Transações</CardTitle>
												<MoveUpRight className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent className="p-0">
												<div className="text-2xl font-bold">+20</div>
												<p className="text-xs text-muted-foreground">+20.1% from last month</p>
											</CardContent>
										</Card>

										<Card className="col-span-2">
											<CardContent>{/* <Overview /> */}</CardContent>
										</Card>

										<Card className="max-lg:col-span-2">
											<CardHeader>
												<CardTitle>Última transação</CardTitle>
												<CardDescription>You made 265 sales this month.</CardDescription>
											</CardHeader>
											<CardContent>{/* <RecentSales /> */}</CardContent>
										</Card>
									</div>
								</div>
							</div>
						</main>

						<NewTransactionModal />
					</div>
				)}
			</HomeContext.Consumer>
		</HomeProvider>
	);
};
