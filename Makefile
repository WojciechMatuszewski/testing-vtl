.PHONY: dynamo

dynamo:
	docker run -d -p 8000:8000 amazon/dynamodb-local
