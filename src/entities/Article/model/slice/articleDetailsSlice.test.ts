import { ArticleDetailsSchema } from 'entities/Article';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

const data = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [],
    blocks: [],
};

describe('articleDetailsSlice.test', () => {
    test('test get article details services pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.pending,
        )).toEqual({
            isLoading: true,
        });
    });

    test('test get article details services fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.fulfilled(data, '1', ''),
        )).toEqual({
            isLoading: false,
            data,
        });
    });
});
