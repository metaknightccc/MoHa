import spacy

# test spacy capabilities

def jaccard_similarity(query, document):
    intersection = set(query).intersection(set(document))
    if(len(intersection) == 0):
        return -1
    return len(intersection)/(len(query) + len(document) - len(intersection))

nlp = spacy.load('en_core_web_sm')

test_string = "This is a test, and I am testing the spacy capabilities. I am enlisting several course names: Introduction to Computer Science, Introduction to Data Science, and Introduction to Artificial Intelligence."
doc = nlp(test_string)

tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
lemma = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]

print(tokens)
print(lemma)