package io.elice.shoppingmall.user.util;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserMasking {
    public static String name(String name) {
        int length = name.length();

        String middleMask = "";
        if(length > 2) {
            middleMask = name.substring(1, length - 1);
        } else {
            middleMask = name.substring(1, length);
        }

        String dot = "";
        for(int i = 0; i<middleMask.length(); i++) {
            dot += "*";
        }

        if(length > 2) {
            return name.substring(0, 1)
                    + middleMask.replace(middleMask, dot)
                    + name.substring(length-1, length);
        } else {
            return name.substring(0, 1)
                    + middleMask.replace(middleMask, dot);
        }
    }

    public static String phoneNumber(String phoneNumber) {
        if (phoneNumber == null) return null;
        String regex = "(\\d{2,3})-?(\\d{3,4})-?(\\d{4})$";

        Matcher matcher = Pattern.compile(regex).matcher(phoneNumber);
        if(matcher.find()) {
            String target = matcher.group(2);
            int length = target.length();
            char[] c = new char[length];
            Arrays.fill(c, '*');

            return phoneNumber.replace(target, String.valueOf(c));
        }
        return phoneNumber;
    }
}
