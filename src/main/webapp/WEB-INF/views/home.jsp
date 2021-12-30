<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cpath">${ pageContext.request.contextPath }</c:set>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="${ cpath }/resources/css/style.css">
</head>
<body>
<script src="${ cpath }/resources/js/xml2json.js"></script>
<script src="${ cpath }/resources/js/function.js"></script>
<h1>공공데이터 포털 코로나 시.도 발생현황</h1>
<hr>

<div id="root">
	
</div>

<script>
	const cpath = '${ cpath }'
	const root = document.getElementById('root')
	console.log(root)
	

	
// 	window.onload = getCovidDataJavascript		// fetch로 직접 공공 데이터에 요청을 전달
	
	window.onload = getCovidDataJava
</script>
</body>
</html>