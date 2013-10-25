<?php
	// XML로 보낼때는 이렇게 header에 xml포맷이라고 추가해줘야 합니다.
	header("Content-Type:text/xml; charset=utf-8");
	
	$data1	= $_POST["data1"];
	$data2	= $_POST["data2"];
	
	$xmlResult="<result>";
	$xmlResult.="	<data1>$data1</data1>";
	$xmlResult.="  <data2>$data2</data2>";
	$xmlResult.="</result>";
	// 클라이언트로 보낼 응답을 XML포맷방식으로 문자열을 만들어 보냅니다.
	echo($xmlResult);
?>