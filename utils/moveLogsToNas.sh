#! /bin/zsh

SERVER='root@ananas.local'
SERVER_LOG_DIR='/volume1/homes/julienderay/ant-logs'
LOCAL_LOG_DIR='ant-logs'

TMP_SERVER_LOGS_LIST='ananas-logs.tmp'
TMP_LOCAL_LOGS_LIST='local-logs.tmp'
DIFF_FILES_LIST='diff.tmp'

ssh $SERVER "ls $SERVER_LOG_DIR" > $TMP_SERVER_LOGS_LIST
ls $LOCAL_LOG_DIR > $TMP_LOCAL_LOGS_LIST

diff $TMP_SERVER_LOGS_LIST $TMP_LOCAL_LOGS_LIST | grep '>' | awk '{print $2}' > $DIFF_FILES_LIST

while read logFile; do
  scp $LOCAL_LOG_DIR/$logFile $SERVER:$SERVER_LOG_DIR
done < $DIFF_FILES_LIST

rm $TMP_LOCAL_LOGS_LIST $TMP_SERVER_LOGS_LIST $DIFF_FILES_LIST
