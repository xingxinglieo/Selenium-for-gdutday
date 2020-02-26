echo "开始暂存"
echo "当前目录 : %cd%"
git add -A
echo;
 
echo "开始提交"
set now=%date% %time%
git commit -m "%now%"
echo;
 
echo "提交到远程仓库"
git push
echo;
 
echo "完成"
echo;