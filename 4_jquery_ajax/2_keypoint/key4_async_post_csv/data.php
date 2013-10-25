<?php
	$data1 = $_POST["data1"];
	$data2	=$_POST["data2"];
	// |를 구분자로 사용해서 key=value값들을 하나의 긴 문자열로 만들어 클라이언트로 응답을 보냅니다.
	echo("data1=".$data1."|data2=".$data2);
?>