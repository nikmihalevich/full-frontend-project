import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>();

    return (
        <Page className={classNames('cls.ProfilePage', {}, [className])}>
            <VStack max gap="16">

                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
