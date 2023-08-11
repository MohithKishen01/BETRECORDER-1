cd\
cd projects\development\enlj

del p102accounts\mssqlv51\p10251settleact\sasettings\logics\*.class
javac p102accounts\mssqlv51\p10251settleact\sasettings\logics\*.java

del p102accounts\mssqlv51\WEB-INF\classes\enlj\p102accounts\mssqlv51\p10251settleact\sasettings\logics\*.class
copy p102accounts\mssqlv51\p10251settleact\sasettings\logics\*.class p102accounts\mssqlv51\WEB-INF\classes\enlj\p102accounts\mssqlv51\p10251settleact\sasettings\logics

@pause