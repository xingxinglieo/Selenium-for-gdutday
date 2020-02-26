echo "��ʼ�ݴ�"
echo "��ǰĿ¼ : %cd%"
git add -A
echo;
 
echo "��ʼ�ύ"
set now=%date% %time%
git commit -m "%now%"
echo;
 
echo "�ύ��Զ�ֿ̲�"
git push git@github.com:xingxinglieo/Selenium.git 
echo;
 
echo "���"
echo;