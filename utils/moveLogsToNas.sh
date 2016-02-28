#!/bin/sh

cd /home/pi
eval `ssh-agent -s`
SSH_AUTH_SOCK=/tmp/ssh-J9m35ZYHxXwg/agent.24232

SERVER='root@ananas.local'
SERVER_LOG_DIR='/volume1/homes/julienderay/ant-logs'
LOCAL_LOG_DIR='/home/pi/ant-logs'

TMP_SERVER_LOGS_LIST='/home/pi/ananas-logs.tmp'
TMP_LOCAL_LOGS_LIST='/home/pi/local-logs.tmp'
DIFF_FILES_LIST='/home/pi/diff.tmp'

## Gets the list of logs to copy
ssh $SERVER "ls $SERVER_LOG_DIR" > $TMP_SERVER_LOGS_LIST
ls $LOCAL_LOG_DIR > $TMP_LOCAL_LOGS_LIST

diff $TMP_SERVER_LOGS_LIST $TMP_LOCAL_LOGS_LIST | grep '>' | awk '{print $2}' > $DIFF_FILES_LIST

## Copies the logs on the server
while read logFile; do
  scp $LOCAL_LOG_DIR/$logFile $SERVER:$SERVER_LOG_DIR && rm $LOCAL_LOG_DIR/$logFile
done < $DIFF_FILES_LIST

rm $TMP_LOCAL_LOGS_LIST $TMP_SERVER_LOGS_LIST $DIFF_FILES_LIST

kill $SSH_AGENT_PID
