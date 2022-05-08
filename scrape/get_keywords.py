import yake
import sys

language = "es"
max_ngram_size = 1
deduplication_thresold = 0.9
deduplication_algo = 'seqm'
windowSize = 1
numOfKeywords = 10

custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_thresold, dedupFunc=deduplication_algo, windowsSize=windowSize, top=numOfKeywords, features=None)

keywords = custom_kw_extractor.extract_keywords(sys.argv[1])
palabrasClave = ""

for kw in keywords:
  palabrasClave = palabrasClave + str(kw[0])+","

print(palabrasClave)