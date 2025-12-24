package com.ideen;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }

        var c1 = new Client("127.0.0.1", "Caterpillar");
        var c2 = new Client("192.168.0.1", "Justin");
        var c3 = new Client("172.0.0.1", "bob");
        var c4 = new Client("10.10.0.1", "Alice");

        var queue = new ClientQueue();
        queue.addClientListener(new ClientListener() {
            @Override
            public void clientAdded(ClientEvent event) {
                System.out.printf("%s from %s online%n", event.getName(), event.getIp());
            }

            @Override
            public void clientRemoved(ClientEvent event) {
                System.out.printf("%s from %s offline%n", event.getName(), event.getIp());

            }
        });

        queue.add(c1);
        queue.add(c2);
        queue.add(c3);
        queue.add(c4);

        queue.remove(c1);
        queue.remove(c2);
        queue.remove(c3);

        printCurrentTime();

    }
    static void printCurrentTime() {
        var now = LocalDateTime.now();
        System.out.printf("Current time: %02d:%02d:%02d%n", now.getHour(), now.getMinute(), now.getSecond());

        LocalDate date = LocalDate.of(Year.now().getValue(), Month.NOVEMBER, 19);
        System.out.println(date);
        DateTimeFormatter formatterShort = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT);
        DateTimeFormatter formatterMedium = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM);
        DateTimeFormatter formatterLong = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG);
        DateTimeFormatter formatterFull = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);

        System.out.println(date.format(formatterShort));
        System.out.println(date.format(formatterMedium));
        System.out.println(date.format(formatterLong));
        System.out.println(date.format(formatterFull));
    }
    public static Optional<LocalDate> parseDate(String string) {
        LocalDate now = LocalDate.now();

        Collections<Function<String, LocalDate>> parses = Arrays.asList(
                input -> LocalDate.parse(input, DateTimeFormatter.ofPattern("yyyy-M-d")),
                input -> LocalDate.parse(input, DateTimeFormatter.ofPattern("d/M/yyyy")),
                input -> LocalDate.parse(input, DateTimeFormatter.ofPattern("d/M/yyyy")),
                input -> input.equalsIgnoreCase("yesterday") ? now.minusDays(1):null,
                input -> input.equalsIgnoreCase("today") ? now : null,
                input -> input.eqaulsIgnoreCase("tomorrow") ? now.plusDays(1):null,
                input -> new Scanner(input).findAll("(\\d+) days? ago")
                        .map(matchResult -> matchResult.group(1))
                        .mapToInt(Integer::parseInt)
                        .mapToObj(now.minusDays())
                        .findFirst().orElse(null)
        );

        for (Function<String, LocalDate>parser:parsers) {
            try {
                return Optional.of(parser.apply(string));
            } catch (Exception e) {
            }
        }

        return Optional.empty();
    }
}
