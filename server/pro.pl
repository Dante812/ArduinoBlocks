#!/usr/bin/perl
use strict;
use 5.010;
use warnings;
no if $] >= 5.018, warnings => "experimental::smartmatch";

use CGI;
my $my_cgi = new CGI;
print "Content-type: text/html\n\n";
# отримання даних від html сторінки
my $variablesData = $my_cgi->param("variables");
my $elementsData = $my_cgi->param("elements");
my $serialBegin = $my_cgi->param("serialBegin");
my $actions = $my_cgi->param("actions");
# тестовий вивід
# починаємо розбір даних

#оголошуємо функцію для обробки змінних
sub variablesCreator {
    # змінна куди передається текст з html сторінки
    my ($text) = @_;
    chomp($text);
    # індекс
    my $index = 0;
    # масив готових змінних
    my @variables;
    # масив типів змінних
    my @variableTypes;
    # масив імен змінних
    my @variableNames;
    # масив значень змінних
    my @variableValues;
    # потрібно розбити дані на рядки по знаку ";"
    my @codeLines = split(/;/,$text);
    # цикл який буде перераховувати всі лінії змінних
    foreach my $line (@codeLines) {
        if ($line =~ /(?<type>.*)_(?<name>.*)_(?<value>.*)/) {
            # добавляємо тип змінної в масив типів
            $variableTypes[$index] = $+{type};
            # добавляємо ім'я змінної в масив імен
            $variableNames[$index] = $+{name};
            # добавляємо значення змінної в масив значень
            $variableValues[$index] = $+{value};
            # збільшуємо індекс
            $index++;
        }
    }
    # створення рядків коду c++ для змінних
    for (my $i = 0; $i<$index; $i++) {
        # створення рядку змінної
        if ($variableTypes[$i] eq "String") {
            $variables[$i] = ($variableTypes[$i]." ".$variableNames[$i]." = "."\"".$variableValues[$i]."\"".";");
        }else{
            $variables[$i] = ($variableTypes[$i]." ".$variableNames[$i]." = ".$variableValues[$i].";");
        }
    }
    foreach my $line (@variables) {
        print($line."<br>");
    }    
}
# оголошуємо функцію для обробки елементів
sub elementsCreator {
    my ($text) = @_; 
    chomp($text);
    # потрібно розбити дані на рядки по знаку ";"
    my @elementsLines = split(/;/,$text);
    # індекс
    my $index = 0;
    # масив готових елементів
    my @elements;
    # масив pinMode елементів
    my @elementsPinModes;
    # масив пінів елементів
    my @elementsPins;
    # масив імен елементів
    my @elementsNames;
    # цикл який буде перераховувати всі лінії елементів
    foreach my $line (@elementsLines) {
        if ($line =~ /(?<pin>.*)_(?<mode>.*)_(?<name>.*)/) {
            # добавляємо пін елементу в масив пінів
            $elementsPins[$index] = $+{pin};
            # добавляємо режим елементу в масив режимів
            $elementsPinModes[$index] = $+{mode};
            # добавляємо ім'я піну в масив імен
            $elementsNames[$index] = $+{name};
            # збільшуємо індекс
            $index++;
        }
    }
    # створення рядків коду c++ для елементів
    for (my $i = 0; $i<$index; $i++) {
        # створення рядку елемента
        $elements[$i] = "\#define ".$elementsNames[$i]." ".$elementsPins[$i];
    }
    foreach my $line (@elements) {
        print($line."<br>");
    }
    print("void setup(){");
    # задаємо швидкість спілкування Arduino з комп'ютером
    print("<pre>    Serial.begin($serialBegin);</pre>");
    # записуємо всі pinMode
    for (my $i = 0; $i < $index; $i++) {
        print("<pre>    pinMode(".$elementsNames[$i].", ".$elementsPinModes[$i].");</pre>");
    }
    print("}"."<br>");
}
# функція для формування c++ коду функцій
sub actionsCreator {
    my ($text) = @_;
    chomp($text);
    my @actionsLines = split(/;/,$text);
    # початок void loop
    print("void loop(){");
    foreach my $action (@actionsLines){
        print("<pre>    $action;</pre>");
    }
    print("}");
}

# друкуємо void setup
&variablesCreator($variablesData);
&elementsCreator($elementsData);
&actionsCreator($actions);



