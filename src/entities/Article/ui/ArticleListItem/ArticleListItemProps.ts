import { HTMLAttributeAnchorTarget } from 'react';

import { Article, ArticleView } from '../..';

export interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}
