#! /bin/zsh

ssh root@ananas.local 'ls /volume1/homes/julienderay/ant-logs' > ananas-logs.tmp
ls ant-logs > local-logs.tmp

diff ananas-logs.tmp local-logs.tmp | grep '>' | awk '{print $2}' > diff.tmp

while read p; do
  scp ant-logs/$p root@ananas.local:/volume1/homes/julienderay/ant-logs
done < diff.tmp
