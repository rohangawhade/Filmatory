from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd


def get_index_from_title(title):
    return movie[movie.title == title]["index"].values[0]


def get_title_from_index(index):
    return movie[movie.index == index]["title"].values[0]


def combine_features(row):
    return row['genres']+' '+row['keywords']+' '+row['overview']+' '+row['tagline']+' '+row['title']+' '+row['cast']+' '+row['director']


cv = CountVectorizer()

movie = pd.read_csv('./movie_dataset.csv')
# movie=movie.drop(columns=['budget', 'homepage', 'original_language', 'original_title', 'popularity','production_companies', 
                    #    'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status','crew'])

movie=movie.drop(columns=['homepage','status','crew'])
movie = movie.dropna()
movie2 = movie.copy(deep=True)
movie3 = movie.copy(deep=True)
movie['combined_features']=movie.apply(combine_features, axis=1)

movie.reset_index(inplace=True)
movie.drop(columns=['level_0'], inplace=True)
movie['index']=range(0, len(movie))

count_matrix = cv.fit_transform(movie['combined_features']).toarray()

cosine_sim = cosine_similarity(count_matrix)


def RecommendMovies(movie_name):
    try:
        index = get_index_from_title(movie_name)
        sim_movie_index = cosine_sim[index]
        sim_movie_unsorted = list(enumerate(sim_movie_index))
        sim_movie = sorted(sim_movie_unsorted, key = lambda x: x[1], reverse=True)
        movie_list=[]
        for ind in sim_movie[1:5]:
            movie_list.append(get_title_from_index(ind[0]))
        print(movie_list)
        return movie_list
    except:
        return "No Movies"