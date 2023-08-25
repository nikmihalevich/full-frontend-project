import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const VStack = (props: HStackProps) => {
	const { align = 'start' } = props;
	return <Flex {...props} direction="column" align={align} />;
};
