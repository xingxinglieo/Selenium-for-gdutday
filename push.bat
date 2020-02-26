echo "暂存"
echo "时间: %cd%"
git add -A
echo;
 
echo "提交"
set now=%date% %time%
git commit -m "%now%"
echo;
 
echo "上传"
git push git@github.com:xingxinglieo/Selenium.git 
echo;
 
echo "完成"
echo;