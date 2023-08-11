import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return <Text title={t('Профиль не найден')} theme={TextTheme.ERROR} />;
    }

    return (
        <Page className={classNames('cls.ProfilePage', {}, [className])}>
            <VStack max gap="16">

                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
