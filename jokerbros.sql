-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Май 04 2017 г., 15:35
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `jokerbros`
--

-- --------------------------------------------------------

--
-- Структура таблицы `jb`
--

CREATE TABLE IF NOT EXISTS `jb` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `bet` int(4) NOT NULL,
  `status` int(1) NOT NULL,
  `game` varchar(20) NOT NULL,
  `rounds` int(2) NOT NULL,
  `players` int(2) NOT NULL,
  `user_id` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=207 ;

--
-- Дамп данных таблицы `jb`
--

INSERT INTO `jb` (`id`, `bet`, `status`, `game`, `rounds`, `players`, `user_id`) VALUES
(1, 100, 1, 'joker', 3, 2, 1),
(3, 150, 2, 'backgammon', 3, 2, 1),
(5, 110, 2, 'slots', 2, 3, 3),
(6, 200, 3, 'joker', 5, 3, 6),
(7, 100, 4, 'domino', 1, 5, 5),
(8, 150, 1, 'domino', 1, 5, 8),
(10, 90, 3, 'bura', 2, 3, 10),
(13, 200, 4, 'joker', 3, 4, 7),
(14, 210, 1, 'backgammon', 1, 2, 6),
(15, 300, 3, 'bura', 3, 4, 5),
(16, 250, 4, 'domino', 3, 6, 4),
(18, 400, 2, 'joker', 5, 3, 7),
(32, 100, 2, 'seka', 3, 8, 9),
(33, 100, 1, 'domino', 3, 8, 9),
(34, 100, 1, 'domino', 3, 8, 9),
(35, 100, 1, 'bura', 3, 8, 9),
(36, 100, 2, 'bura', 3, 8, 9),
(39, 100, 3, 'backgammon', 3, 8, 9),
(42, 100, 1, 'joker', 3, 8, 9),
(43, 100, 4, 'seka', 3, 8, 5),
(45, 100, 1, 'bura', 3, 8, 5),
(49, 100, 1, 'joker', 3, 8, 5),
(52, 100, 1, 'slots', 3, 8, 5),
(55, 100, 1, 'slots', 3, 8, 5),
(71, 100, 1, 'slots', 3, 8, 7),
(90, 100, 1, 'joker', 3, 8, 10),
(94, 100, 1, 'slots', 3, 8, 10),
(97, 100, 1, 'slots', 3, 8, 10),
(102, 100, 1, 'domino', 3, 8, 6),
(105, 100, 1, 'domino', 3, 8, 6),
(114, 100, 1, 'joker', 3, 8, 6),
(119, 100, 1, 'slots', 3, 8, 6),
(120, 100, 1, 'slots', 3, 8, 6),
(126, 100, 1, 'domino', 3, 8, 5),
(133, 100, 1, 'bura', 3, 8, 5),
(140, 100, 1, 'bura', 3, 8, 5),
(142, 100, 1, 'backgammon', 3, 8, 5),
(147, 100, 1, 'joker', 3, 8, 5),
(150, 100, 1, 'slots', 3, 8, 5),
(153, 100, 1, 'slots', 3, 8, 5),
(159, 100, 1, 'slots', 3, 8, 33),
(160, 100, 1, 'slots', 3, 8, 33),
(168, 100, 1, 'joker', 3, 8, 34),
(169, 100, 1, 'joker', 3, 8, 34),
(171, 100, 1, 'backgammon', 3, 8, 34),
(174, 100, 1, 'backgammon', 3, 8, 34),
(175, 100, 1, 'bura', 3, 8, 34),
(178, 100, 1, 'bura', 3, 8, 34),
(183, 100, 1, 'domino', 3, 8, 34),
(184, 100, 1, 'domino', 3, 8, 34),
(190, 100, 1, 'slots', 3, 8, 34),
(194, 100, 1, 'slots', 3, 8, 34),
(198, 100, 1, 'seka', 3, 8, 2),
(206, 300, 1, 'backgammon', 9, 9, 46);

-- --------------------------------------------------------

--
-- Структура таблицы `jb_status`
--

CREATE TABLE IF NOT EXISTS `jb_status` (
  `id_status` int(2) NOT NULL,
  `status_name` varchar(10) NOT NULL,
  `id_privacy` int(11) DEFAULT NULL,
  `privacy_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `jb_status`
--

INSERT INTO `jb_status` (`id_status`, `status_name`, `id_privacy`, `privacy_name`) VALUES
(1, 'OPEN', 1, 'ACCESS'),
(2, 'PLAY', 2, 'PASS'),
(3, 'WAITING', 1, 'ACCESS'),
(4, 'ENDED', 1, 'ACCESS');

-- --------------------------------------------------------

--
-- Структура таблицы `jb_user`
--

CREATE TABLE IF NOT EXISTS `jb_user` (
  `user_id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gel` int(7) NOT NULL,
  `wins` int(4) NOT NULL,
  `defs` int(4) NOT NULL,
  `draws` int(4) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

--
-- Дамп данных таблицы `jb_user`
--

INSERT INTO `jb_user` (`user_id`, `name`, `login`, `password`, `gel`, `wins`, `defs`, `draws`, `avatar`) VALUES
(1, 'Jacob Pruts', '1', '1', 6560, 37, 121, 0, 'img/1.jpg'),
(2, 'Willie Miller', '2', '1', -800, 10, 82, 0, 'img/2.jpg'),
(3, 'Michael Michell', '3', '1', 9410, 10, 81, 0, 'img/3.jpg'),
(4, 'MIranda Vatson', '4', '1', -1230, 15, 84, 0, 'img/4.jpg'),
(5, 'John Smith', '5', '1', 5970, 18, 87, 0, 'img/5.jpg'),
(6, 'Erik Johnson', '6', '1', 4330, 14, 62, 0, 'img/6.jpg'),
(7, 'Selena Williams', '7', '1', 4840, 12, 79, 0, 'img/7.jpg'),
(8, 'Michael Jones', '8', '1', -850, 8, 76, 0, 'img/8.jpg'),
(9, 'Wild Brown', '9', '1', 5120, 23, 115, 0, 'img/9.jpg'),
(10, 'Dexter Davis', '10', '1', -2060, 9, 83, 0, 'img/10.gif'),
(11, 'Dexter Manderbrandt', '11', '1', -5550, 4, 82, 0, 'img/11.jpg'),
(12, 'Jamal Rastafari', '12', '1', -1800, 6, 70, 0, 'img/12.jpg'),
(31, 'Kantron Strike', '13', '1', 2300, 12, 65, 0, 'img/Ava freelance.jpg'),
(32, 'Kelob Jobs', '14', '1', -5300, 3, 67, 0, 'img/photo.jpg'),
(33, 'Lisa Cameron', '15', '1', 8721, 14, 64, 0, 'img/123232144.png'),
(46, 'Jamal Rastafari', 'Jamal', '147147', 3800, 4, 49, 0, 'img/Avaforpolyglot.jpg'),
(47, 'Лекан Троп', 'Лекан', '1', 900, 0, 1, 0, 'img/a_459f5a9c.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
