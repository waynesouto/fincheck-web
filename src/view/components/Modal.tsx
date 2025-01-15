import * as RdxDialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

type ModalProps = {
	open: boolean;
	children: React.ReactNode;
	title: string;
	rightAction?: React.ReactNode;
	onClose?(): void;
};

export const Modal = ({
	open,
	children,
	title,
	rightAction,
	onClose,
}: ModalProps) => {
	return (
		<RdxDialog.Root open={open} onOpenChange={onClose}>
			<RdxDialog.Portal>
				<RdxDialog.Overlay
					className={cn(
						"fixed inset-0 bg-black/80 backdrop-blur-sm z-50",
						"data-[state=open]:animate-overlay-show"
					)}
				/>

				<RdxDialog.Content
					className={cn(
						"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none w-full max-w-[400px] z-[51]",
						"data-[state=open]:animate-content-show"
					)}
				>
					<header className="h-12 flex items-center justify-between text-gray-800">
						<button
							onClick={onClose}
							className="w-12 h-12 flex items-center justify-center outline-none"
						>
							<Cross2Icon className="w-6 h-6" />
						</button>

						<strong className="text-lg tracking-[-1px]">{title}</strong>

						<div className="w-12 h-12 flex items-center justify-center">
							{rightAction}
						</div>
					</header>

					<div>{children}</div>

					<VisuallyHidden.Root>
						<RdxDialog.Title>{title}</RdxDialog.Title>
						<RdxDialog.Description>{title}</RdxDialog.Description>
					</VisuallyHidden.Root>
				</RdxDialog.Content>
			</RdxDialog.Portal>
		</RdxDialog.Root>
	);
};
