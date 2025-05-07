-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.41 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 erp.tbl_bom 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_bom` (
  `bom_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'BOM 항목 ID',
  `product_id` bigint NOT NULL COMMENT '완성품 ID',
  `material_id` bigint NOT NULL COMMENT '자재 ID',
  `quantity` double NOT NULL COMMENT '자재 소요량',
  `unit` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '단위',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  PRIMARY KEY (`bom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='제품별 자재 구성';

-- 테이블 데이터 erp.tbl_bom:~31 rows (대략적) 내보내기
INSERT INTO `tbl_bom` (`bom_id`, `product_id`, `material_id`, `quantity`, `unit`, `created_at`) VALUES
	(1, 1, 1, 2, '장', '2025-05-07 05:39:08'),
	(2, 1, 2, 30, 'g', '2025-05-07 05:39:08'),
	(3, 1, 3, 20, 'g', '2025-05-07 05:39:08'),
	(4, 1, 4, 20, 'g', '2025-05-07 05:39:08'),
	(5, 1, 5, 1, '장', '2025-05-07 05:39:08'),
	(6, 1, 6, 1, '개', '2025-05-07 05:39:08'),
	(7, 1, 7, 1, '장', '2025-05-07 05:39:08'),
	(8, 1, 11, 20, 'g', '2025-05-07 05:39:08'),
	(9, 2, 1, 2, '장', '2025-05-07 05:39:08'),
	(10, 2, 2, 30, 'g', '2025-05-07 05:39:08'),
	(11, 2, 3, 20, 'g', '2025-05-07 05:39:08'),
	(12, 2, 4, 20, 'g', '2025-05-07 05:39:08'),
	(13, 2, 8, 2, '줄', '2025-05-07 05:39:08'),
	(14, 2, 6, 1, '개', '2025-05-07 05:39:08'),
	(15, 2, 7, 1, '장', '2025-05-07 05:39:08'),
	(16, 2, 11, 20, 'g', '2025-05-07 05:39:08'),
	(17, 3, 1, 2, '장', '2025-05-07 05:39:08'),
	(18, 3, 2, 30, 'g', '2025-05-07 05:39:08'),
	(19, 3, 3, 20, 'g', '2025-05-07 05:39:08'),
	(20, 3, 10, 40, 'g', '2025-05-07 05:39:08'),
	(21, 3, 12, 20, 'g', '2025-05-07 05:39:08'),
	(22, 4, 1, 2, '장', '2025-05-07 05:39:08'),
	(23, 4, 2, 30, 'g', '2025-05-07 05:39:08'),
	(24, 4, 3, 20, 'g', '2025-05-07 05:39:08'),
	(25, 4, 9, 1, '개', '2025-05-07 05:39:08'),
	(26, 4, 15, 20, 'g', '2025-05-07 05:39:08'),
	(27, 5, 1, 2, '장', '2025-05-07 05:39:08'),
	(28, 5, 2, 20, 'g', '2025-05-07 05:39:08'),
	(29, 5, 7, 1, '장', '2025-05-07 05:39:08'),
	(30, 5, 13, 20, 'g', '2025-05-07 05:39:08'),
	(31, 5, 14, 20, 'g', '2025-05-07 05:39:08');

-- 테이블 erp.tbl_expired_inventory 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_expired_inventory` (
  `expired_id` bigint NOT NULL AUTO_INCREMENT COMMENT '폐기 이력 ID',
  `material_id` bigint NOT NULL COMMENT '자재 ID',
  `store_id` bigint NOT NULL COMMENT '매장 ID',
  `quantity` double NOT NULL DEFAULT '0' COMMENT '폐기 수량',
  `expired_at` date NOT NULL COMMENT '유통기한 (기준일)',
  `recorded_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '폐기 기록 시점',
  PRIMARY KEY (`expired_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='유통기한 초과 자재 폐기 기록';

-- 테이블 데이터 erp.tbl_expired_inventory:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_gubn 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_gubn` (
  `group_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '그룹 코드',
  `gubn_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '코드 구분',
  `gubn_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '코드 이름',
  PRIMARY KEY (`group_code`,`gubn_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='공통 코드 관리';

-- 테이블 데이터 erp.tbl_gubn:~26 rows (대략적) 내보내기
INSERT INTO `tbl_gubn` (`group_code`, `gubn_code`, `gubn_name`) VALUES
	('material_category', 'B', '빵'),
	('material_category', 'D', '유제품'),
	('material_category', 'E', '계란'),
	('material_category', 'F', '과일'),
	('material_category', 'M', '육가공'),
	('material_category', 'S', '소스'),
	('material_category', 'V', '야채'),
	('region_code', 'BS', '부산'),
	('region_code', 'CB', '충북'),
	('region_code', 'CN', '충남'),
	('region_code', 'DG', '대구'),
	('region_code', 'DJ', '대전'),
	('region_code', 'GB', '경북'),
	('region_code', 'GG', '경기'),
	('region_code', 'GJ', '광주'),
	('region_code', 'GN', '경남'),
	('region_code', 'GW', '강원'),
	('region_code', 'IC', '인천'),
	('region_code', 'JB', '전북'),
	('region_code', 'JJ', '제주'),
	('region_code', 'JN', '전남'),
	('region_code', 'SE', '서울'),
	('region_code', 'SJ', '세종'),
	('region_code', 'US', '울산'),
	('supply_status', 'A', '승인'),
	('supply_status', 'D', '출고완료'),
	('supply_status', 'R', '요청'),
	('supply_status', 'S', '출고중'),
	('supply_status', 'X', '취소'),
	('work_status', 'C', '완료'),
	('work_status', 'O', '지시'),
	('work_status', 'P', '진행'),
	('work_status', 'X', '취소');

-- 테이블 erp.tbl_inventory 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_inventory` (
  `inventory_id` bigint NOT NULL AUTO_INCREMENT COMMENT '재고 ID',
  `store_id` bigint NOT NULL COMMENT '매장 ID (본사면 NULL or 0)',
  `material_id` bigint NOT NULL COMMENT '자재 ID',
  `quantity` double NOT NULL DEFAULT '0' COMMENT '수량',
  `expired_at` date DEFAULT NULL COMMENT '유통기한',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='본사/매장 재고 수량 + 유통기한';

-- 테이블 데이터 erp.tbl_inventory:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_material 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_material` (
  `material_id` bigint NOT NULL AUTO_INCREMENT COMMENT '자재 ID',
  `material_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '자재명',
  `unit` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '단위 (g, 장, 개 등)',
  `unit_price` int NOT NULL DEFAULT '0' COMMENT '단가 (원 단위)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  `category` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '자재 분류 (야채, 소스 등)',
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='자재 정보';

-- 테이블 데이터 erp.tbl_material:~0 rows (대략적) 내보내기
INSERT INTO `tbl_material` (`material_id`, `material_name`, `unit`, `unit_price`, `created_at`, `category`) VALUES
	(1, '식빵', '장', 100, '2025-05-07 05:36:06', 'B'),
	(2, '양상추', 'g', 10, '2025-05-07 05:36:06', 'V'),
	(3, '양파', 'g', 10, '2025-05-07 05:36:06', 'V'),
	(4, '사과', 'g', 15, '2025-05-07 05:36:06', 'F'),
	(5, '햄', '장', 70, '2025-05-07 05:36:06', 'M'),
	(6, '계란후라이', '개', 200, '2025-05-07 05:36:06', 'E'),
	(7, '치즈', '장', 100, '2025-05-07 05:36:06', 'D'),
	(8, '베이컨', '줄', 120, '2025-05-07 05:36:06', 'M'),
	(9, '떡갈비패티', '개', 500, '2025-05-07 05:36:06', 'M'),
	(10, '치킨가슴살', 'g', 40, '2025-05-07 05:36:06', 'M'),
	(11, 'SD 수제 소스', 'g', 30, '2025-05-07 05:36:06', 'S'),
	(12, '스위트칠리소스', 'g', 25, '2025-05-07 05:36:06', 'S'),
	(13, '크림치즈', 'g', 60, '2025-05-07 05:36:06', 'D'),
	(14, '딸기잼', 'g', 40, '2025-05-07 05:36:06', 'S'),
	(15, '바베큐소스', 'g', 25, '2025-05-07 05:36:06', 'S');

-- 테이블 erp.tbl_product 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT COMMENT '제품 ID',
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '샌드위치 이름',
  `product_desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '설명 또는 레시피 정보',
  `price` int NOT NULL DEFAULT '0' COMMENT '판매 단가 (원 단위)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='샌드위치 제품 정보';

-- 테이블 데이터 erp.tbl_product:~0 rows (대략적) 내보내기
INSERT INTO `tbl_product` (`product_id`, `product_name`, `product_desc`, `price`, `created_at`) VALUES
	(1, 'SD 샌드위치', '햄, 계란, 치즈, 양상추, 사과, 양파, 수제소스가 조화된 시그니처 샌드위치', 3500, '2025-05-07 05:36:35'),
	(2, '베이컨 샌드위치', '베이컨, 계란, 치즈, 양상추, 사과, 양파, 수제소스가 어우러진 풍미', 3700, '2025-05-07 05:36:35'),
	(3, '치킨 샌드위치', '치킨가슴살, 양상추, 양파, 스위트칠리소스로 건강하게', 4300, '2025-05-07 05:36:35'),
	(4, '떡갈비 샌드위치', '떡갈비패티에 바베큐소스로 진한 맛을 낸 샌드위치', 3900, '2025-05-07 05:36:35'),
	(5, '치즈&베리 샌드위치', '크림치즈와 딸기잼의 달콤한 조화, 디저트 샌드위치', 3800, '2025-05-07 05:36:35');

-- 테이블 erp.tbl_sales 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_sales` (
  `sales_id` bigint NOT NULL AUTO_INCREMENT COMMENT '판매 ID',
  `store_id` bigint NOT NULL COMMENT '매장 ID',
  `product_id` bigint NOT NULL COMMENT '판매된 제품',
  `quantity` int NOT NULL DEFAULT '0' COMMENT '판매 수량',
  `sold_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '판매 일시',
  PRIMARY KEY (`sales_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='매장 제품 판매 기록';

-- 테이블 데이터 erp.tbl_sales:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_settlement 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_settlement` (
  `settlement_id` bigint NOT NULL AUTO_INCREMENT COMMENT '정산 ID',
  `store_id` bigint NOT NULL COMMENT '매장 ID',
  `period` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '정산 기간 (예: 2025-04)',
  `total_amount` int NOT NULL DEFAULT '0' COMMENT '총 정산 금액',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'R' COMMENT '상태 (R: 미정산, C: 정산완료)',
  `settled_at` datetime DEFAULT NULL COMMENT '정산일',
  PRIMARY KEY (`settlement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='공급 단가 기반 월별 정산';

-- 테이블 데이터 erp.tbl_settlement:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_shipment_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_shipment_log` (
  `shipment_id` bigint NOT NULL AUTO_INCREMENT COMMENT '출고 이력 ID',
  `order_id` bigint NOT NULL COMMENT '출고 지시서 ID',
  `material_id` bigint NOT NULL COMMENT '자재 ID',
  `store_id` bigint NOT NULL COMMENT '수령 매장 ID',
  `quantity` double NOT NULL DEFAULT '0' COMMENT '출고 수량',
  `shipped_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '출고 일시',
  PRIMARY KEY (`shipment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='실제 자재 출고 기록 (운송/납품)';

-- 테이블 데이터 erp.tbl_shipment_log:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_store 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_store` (
  `store_id` bigint NOT NULL AUTO_INCREMENT COMMENT '매장 ID',
  `store_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `store_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '주소',
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `manager_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  PRIMARY KEY (`store_id`),
  UNIQUE KEY `store_code` (`store_code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='매장 정보';

-- 테이블 데이터 erp.tbl_store:~5 rows (대략적) 내보내기
INSERT INTO `tbl_store` (`store_id`, `store_name`, `store_code`, `location`, `contact`, `manager_name`, `created_at`) VALUES
	(1, '서울강남점', 'SE1', '서울특별시 강남구 테헤란로 123', '02-123-4567', '김서울', '2025-01-01 12:20:57'),
	(2, '부산해운대점', 'BS1', '부산광역시 해운대구 센텀로 456', '051-987-6543', '이부산', '2025-01-15 12:20:57'),
	(3, '광주첨단점', 'GJ1', '광주광역시 북구 첨단과기로 789', '062-222-3333', '박광주', '2025-04-04 12:20:57'),
	(4, '대구동성로점', 'DG1', '대구광역시 중구 동성로 1길 10', '053-444-5555', '최대구', '2025-05-04 12:20:57'),
	(5, '제주공항점', 'JJ1', '제주특별자치도 제주시 공항로 23', '064-111-2222', '한제주', '2025-08-08 12:20:58');

-- 테이블 erp.tbl_supply_item 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_supply_item` (
  `supply_item_id` bigint NOT NULL AUTO_INCREMENT COMMENT '요청 항목 ID',
  `request_id` bigint NOT NULL COMMENT '요청서 ID',
  `material_id` bigint NOT NULL COMMENT '자재 ID',
  `quantity` double NOT NULL DEFAULT '0' COMMENT '요청 수량',
  PRIMARY KEY (`supply_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='요청서의 자재 리스트';

-- 테이블 데이터 erp.tbl_supply_item:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_supply_order 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_supply_order` (
  `order_id` bigint NOT NULL AUTO_INCREMENT COMMENT '출고 지시서 ID',
  `request_id` bigint NOT NULL COMMENT '요청서 ID',
  `approved_by` bigint NOT NULL COMMENT '승인한 사용자 ID',
  `approved_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '승인 일시',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A' COMMENT '상태 코드 (R: 요청, A: 승인, S: 출고중, D: 출고완료, X: 취소)',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='본사 승인 후 출고 지시서';

-- 테이블 데이터 erp.tbl_supply_order:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_supply_request 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_supply_request` (
  `request_id` bigint NOT NULL AUTO_INCREMENT COMMENT '요청서 ID',
  `store_id` bigint NOT NULL COMMENT '요청한 매장 ID',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'R' COMMENT '상태 코드 (R: 요청, A: 승인, S: 출고중, D: 출고완료, X: 취소)',
  `requested_at` datetime DEFAULT (now()) COMMENT '요청일',
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='매장 → 본사 자재 요청서';

-- 테이블 데이터 erp.tbl_supply_request:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '사용자 ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '로그인 ID',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '암호화된 비밀번호',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'store' COMMENT '권한 (admin, store)',
  `store_id` bigint DEFAULT NULL COMMENT '소속 매장 ID (본사일 경우 NULL)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='사용자 계정, 권한, 매장 연결';

-- 테이블 데이터 erp.tbl_user:~0 rows (대략적) 내보내기

-- 테이블 erp.tbl_work_order 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_work_order` (
  `work_order_id` bigint NOT NULL AUTO_INCREMENT COMMENT '작업지시 ID',
  `product_id` bigint NOT NULL COMMENT '제조할 제품 ID',
  `quantity` int NOT NULL DEFAULT '0' COMMENT '생산 수량',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'O' COMMENT '상태 코드 (O: 지시, P: 진행, C: 완료, X: 취소)',
  `created_at` datetime DEFAULT (now()) COMMENT '생성일자',
  PRIMARY KEY (`work_order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='생산지시 정보';

-- 테이블 데이터 erp.tbl_work_order:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
