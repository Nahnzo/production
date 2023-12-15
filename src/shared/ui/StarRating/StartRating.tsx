import { classNames } from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import StarIcon from "shared/assets/icons/star.svg";
import Icon from "../Icon/Icon";
import styles from "./StartRating.module.scss";

interface StartRatingProps {
  className?: string;
  onSelect?: (starCount: number) => void;
  size?: number;
  selectedStars?: number;
}
const stars = [1, 2, 3, 4, 5];

const StartRating = memo((props: StartRatingProps) => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;

  const [currentStarCount, setCurrentStarCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starCount);
    }
  };
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };
  const onClick = (starCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starCount);
      setCurrentStarCount(starCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(styles.StartRating, {}, [className])}>
      {stars.map((ratingNumber) => (
        <Icon
          Svg={StarIcon}
          key={ratingNumber}
          className={classNames(styles.starIcon, { [styles.selected]: isSelected }, [
            currentStarCount >= ratingNumber ? styles.hovered : styles.normal,
          ])}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(ratingNumber)}
          onClick={onClick(ratingNumber)}
        />
      ))}
    </div>
  );
});

export default StartRating;
