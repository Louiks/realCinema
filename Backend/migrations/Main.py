def predictionCalc(model, n_splits=5):

    vectorizer = CountVectorizer(stop_words='english')
    df = pd.read_csv("genres.csv", encoding="utf-8", sep='\t')
    categories = list(df.drop_duplicates('category').sort_values('categoryId')['category'].values)
    corpus = df["description"]
    Xfeatures: csr_matrix = vectorizer.fit_transform(corpus)
    Xfeatures = Xfeatures.toarray()
    y = df['categoryId']
    sss = StratifiedShuffleSplit(n_splits=n_splits, test_size=0.3, random_state=0)
    sss.get_n_splits(Xfeatures, y)
    score = None
    for train_index, test_index in sss.split(Xfeatures, y):
        X_train, X_test = Xfeatures[train_index], Xfeatures[test_index]
        y_train, y_test = y[train_index], y[test_index]
        model.fit(X_train, y_train)
        prediction = model.predict(X_test)
        score = accuracy_score(y_test, prediction)
        print(f"Score : {score}")