import boto3
import json
import subprocess
import os

sqs = boto3.client('sqs')

queue_url = 'https://sqs.ap-southeast-2.amazonaws.com/596860586762/PoemTopicQueue' 

response = sqs.receive_message(
  QueueUrl=queue_url,
  AttributeNames=['All'],
  MaxNumberOfMessages=10
)

if 'Messages' in response:
  message_count = len(response['Messages'])

  print(f'[INFO] Found {str(message_count)} topic(s)')

  for message in response['Messages']:
    receipt_handle = message['ReceiptHandle']
    poem_topic = message['Body']

    if subprocess.call(['./generate.sh', poem_topic]) == 0:
      print('Successfully generated poem')

    print('')
    sqs.delete_message(
      QueueUrl=queue_url,
      ReceiptHandle=receipt_handle
    )
  subprocess.call(['git', 'push', 'origin', 'main'])

else:
  print('No message in the queue')
