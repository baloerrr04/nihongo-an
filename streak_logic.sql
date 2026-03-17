-- Streak Logic Function
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
    last_act DATE;
    current_str INT;
    longest_str INT;
BEGIN
    -- Get current streak info
    SELECT last_activity_date, current_streak, longest_streak INTO last_act, current_str, longest_str
    FROM public.user_streaks
    WHERE user_id = NEW.user_id;

    -- If no streak record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (NEW.user_id, 1, 1, CURRENT_DATE);
        RETURN NEW;
    END IF;

    -- Update streak
    IF last_act = CURRENT_DATE THEN
        -- Already active today, do nothing to current streak
    ELSIF last_act = CURRENT_DATE - INTERVAL '1 day' THEN
        -- Active yesterday, increment current streak
        current_str := current_str + 1;
        IF current_str > longest_str THEN
            longest_str := current_str;
        END IF;
    ELSE
        -- Streak broken
        current_str := 1;
    END IF;

    -- Update user streak record
    UPDATE public.user_streaks
    SET 
        current_streak = current_str,
        longest_streak = longest_str,
        last_activity_date = CURRENT_DATE,
        updated_at = timezone('utc'::text, now())
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for learning progress
CREATE TRIGGER on_progress_created
AFTER INSERT OR UPDATE ON public.learning_progress
FOR EACH ROW EXECUTE PROCEDURE public.update_user_streak();
