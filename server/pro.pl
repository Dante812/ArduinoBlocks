#!/usr/bin/perl
use CGI;
my $my_cgi = new CGI;
print "Content-type: text/html\n\n";


print("Hello world"."<br>");
my $data = $my_cgi->param("data");
print($data);
# foreach my $key (param) { # пробегаемся по всем параметрам запроса
# # помещая ключи значений в переменную $key
# print "<b>$key</b>: "; # выводим имя ключа
# my $value = param($key); # считываем значение ключа
# print $value,"<BR>" # и выводим его на экран
# }
# print end_html;