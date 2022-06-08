from pprint import pprint
import time
import numpy as np


class Book:
    def __init__(self, id, title, description, genres):
        self.id = id
        self.title = title
        self.description = description.replace('\n', '')
        self.genres = sorted(genres)

    def __str__(self):
        return f"{self.id} - {self.title}".ljust(40)[:40] + f"{self.genres}"

    def removeGenre(self, genre):
        self.genres = [x for x in self.genres if x != genre]

    def replaceGenre(self, to_replace, replacement):
        self.remove_genre(to_replace)
        self.genres.append(replacement)

    @property
    def countOfGenres(self):
        return len(self.genres)

    def containsGenre(self, genre):
        return self.genres.count(genre) != 0


class BookShelf:
    def __init__(self):
        self.book_collection: list[Book] = []
        self.genres = {}

    def addBook(self, other: Book):
        self.book_collection.append(other)
        for genre in other.genres:
            if self.genres.get(genre) is None:
                self.genres[genre] = 1
            else:
                self.genres[genre] += 1

    def removeGenre(self, genre):
        del self.genres[genre]
        for book in self.books:
            book.genres(genre)
        self.books = [x for x in self.books if x.countOfGenres > 0]

    def removeGenreCount(self, condition):
        genresToRemove = []
        for genre in self.genres:
            if condition(self.genres[genre]):
                genresToRemove.append(genre)
        for genre in genresToRemove:
            self.removeGenre(genre)